import {
  Client,
  Account,
  ID,
  Databases,
  Avatars,
  Query,
} from "react-native-appwrite"

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.maou.bloggo",
  projectId: "667130b4001a76699be2",
  databaseId: "667132ec0004eaa051bb",
  userCollectionId: "6671331b0038c52c18ef",
  blogCollectionId: "667133460024bb2e8662",
}

const client = new Client()
const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

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
  try {
    const blogs = await databases.listDocuments(
      config.databaseId,
      config.blogCollectionId
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
    console.log("Error searching blogs:", error)

    throw error
  }
}
