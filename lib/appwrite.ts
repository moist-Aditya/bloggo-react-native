import { useGlobalContext } from "@/context/GlobalProvider"
import {
  Client,
  Account,
  ID,
  Databases,
  Avatars,
  Query,
  Storage,
} from "react-native-appwrite"

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.maou.bloggo",
  projectId: "667130b4001a76699be2",
  databaseId: "667132ec0004eaa051bb",
  userCollectionId: "6671331b0038c52c18ef",
  blogCollectionId: "667133460024bb2e8662",
  storageId: "6676b0b40004489cde2f",
}

const client = new Client()
const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw new Error("Could not create account")

    const avatar = avatars.getInitials(username)

    await signInUser(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        username,
        email,
        avatar,
        accountId: newAccount.$id,
      }
    )

    return newUser
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const signInUser = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error: any) {
    throw new Error(error)
  }
}

export const logoutUser = async () => {
  try {
    await account.deleteSession("current")
  } catch (error) {
    console.log("Error logging out user: ", error)
    throw error
  }
}

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get()
    if (!currentUser) throw new Error("No current user")

    const user = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentUser.$id)]
    )

    if (!user) throw new Error("Could not find user in database")

    return user.documents[0]
  } catch (error) {
    console.log("getCurrentUser error:", error)
  }
}

export const getBlogs = async () => {
  // add pagination to optimize flatlist
  try {
    const blogs = await databases.listDocuments(
      config.databaseId,
      config.blogCollectionId,
      [Query.orderDesc("$createdAt")]
    )

    return blogs.documents
  } catch (error) {
    console.log("Error getting blogs:", error)
    throw error
  }
}

export const getUserBlogs = async (userId: string) => {
  try {
    const blogs = await databases.listDocuments(
      config.databaseId,
      config.blogCollectionId,
      [Query.equal("author", userId), Query.orderDesc("$createdAt")]
    )

    return blogs.documents
  } catch (error) {
    console.log("Error getting blogs:", error)
    throw error
  }
}

export const searchBlogs = async (query: string) => {
  try {
    const filteredBlogs = await databases.listDocuments(
      config.databaseId,
      config.blogCollectionId,
      [Query.contains("title", query)]
    )

    return filteredBlogs.documents
  } catch (error) {
    console.log("Error in searchBlogs:", error)

    throw error
  }
}

export const createBlog = async (blog: {
  title: string
  content: string
  userId: string
}) => {
  try {
    // 1. check session and get user
    const user = await account.get()
    if (!user) throw new Error("User not authenticated")

    // 2. create document
    const newBlog = await databases.createDocument(
      config.databaseId,
      config.blogCollectionId,
      ID.unique(),
      {
        title: blog.title,
        content: blog.content,
        author: blog.userId,
        // Implement isPublic logic
      }
    )

    if (!newBlog) {
      throw new Error("Could not post blog")
    }

    return newBlog
  } catch (error) {
    console.log("Error posting blog:", error)
  }
}

export const uploadImageToStorage = async (imageFile: any) => {
  if (!imageFile) return

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      {
        name: imageFile.fileName,
        type: imageFile.mimeType,
        size: imageFile.fileSize,
        uri: imageFile.uri,
      }
    )

    const fileUrl = storage.getFilePreview(config.storageId, uploadedFile.$id)

    return fileUrl
  } catch (error) {
    console.log("Error uploading file to storage", error)
    throw error
  }
}

export const updateUserAvatar = async (userId: string, avatarFile: any) => {
  try {
    const avatarUrlInStorage = await uploadImageToStorage(avatarFile)

    const updatedUser = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
      {
        avatar: avatarUrlInStorage,
      }
    )

    if (!updatedUser) throw new Error("Could not update avatar in DB")

    return updatedUser.avatar
  } catch (error) {
    console.log("Error updating user avatar: ", error)
    throw error
  }
}
