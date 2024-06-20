import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import BlogCard from "@/components/BlogCard"
import HomeHeader from "@/components/HomeHeader"
import { getBlogs } from "@/lib/appwrite"

// const posts = [
//   {
//     id: 3,
//     title: "Understanding JavaScript Closures",
//     content:
//       "JavaScript closures are a powerful concept that allows functions to retain access to their scope even after the outer function has finished execution. In this post, we explore how closures work and provide examples to demonstrate their usage.",
//     author: "Jane Doe",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=jane&project=667130b4001a76699be2",
//     createdAt: "2024-05-10T14:00:00.000Z",
//   },
//   {
//     id: 4,
//     title: "A Guide to React Hooks",
//     content:
//       "React Hooks have revolutionized the way we write React components. In this guide, we'll cover the basics of Hooks, including useState, useEffect, and custom hooks. Learn how to leverage these powerful tools to write cleaner and more maintainable React code.",
//     author: "John Smith",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=john&project=667130b4001a76699be2",
//     createdAt: "2024-04-22T09:30:00.000Z",
//   },
//   {
//     id: 5,
//     title: "CSS Grid vs. Flexbox: A Comparison",
//     content:
//       "CSS Grid and Flexbox are two powerful layout systems in CSS. In this post, we compare their strengths and weaknesses, and provide examples to help you decide which one to use in your next project.",
//     author: "Alice Johnson",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=alice&project=667130b4001a76699be2",
//     createdAt: "2024-03-15T12:00:00.000Z",
//   },
//   {
//     id: 6,
//     title: "Getting Started with TypeScript",
//     content:
//       "TypeScript is a typed superset of JavaScript that can help you write more robust code. This post covers the basics of TypeScript, including type annotations, interfaces, and classes. Start using TypeScript in your projects today!",
//     author: "Bob Lee",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=bob&project=667130b4001a76699be2",
//     createdAt: "2024-02-28T10:00:00.000Z",
//   },
//   {
//     id: 7,
//     title: "Introduction to Node.js",
//     content:
//       "Node.js is a runtime environment that allows you to run JavaScript on the server. In this introduction, we cover the basics of Node.js, including its event-driven architecture and the Node Package Manager (NPM).",
//     author: "Charlie Brown",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=charlie&project=667130b4001a76699be2",
//     createdAt: "2024-01-18T08:00:00.000Z",
//   },
//   {
//     id: 8,
//     title: "Advanced Git Techniques",
//     content:
//       "Git is a powerful version control system used by developers worldwide. This post explores advanced Git techniques, including rebasing, cherry-picking, and resolving merge conflicts. Enhance your Git skills and become a more efficient developer.",
//     author: "David Green",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=david&project=667130b4001a76699be2",
//     createdAt: "2023-12-12T16:00:00.000Z",
//   },
//   {
//     id: 9,
//     title: "Exploring Python Generators",
//     content:
//       "Generators are a powerful feature in Python that allow you to create iterators in a simple way. This post explains how generators work and provides examples of how to use them in your Python programs.",
//     author: "Eve White",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=eve&project=667130b4001a76699be2",
//     createdAt: "2023-11-05T11:00:00.000Z",
//   },
//   {
//     id: 10,
//     title: "Building REST APIs with Express",
//     content:
//       "Express is a popular web framework for Node.js that makes it easy to build REST APIs. In this tutorial, we cover the basics of building a REST API with Express, including routing, middleware, and error handling.",
//     author: "Frank Blue",
//     avatar:
//       "https://cloud.appwrite.io/v1/avatars/initials?name=frank&project=667130b4001a76699be2",
//     createdAt: "2023-10-21T13:00:00.000Z",
//   },
// ]

const Home = () => {
  const [blogs, setBlogs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchBlogs = async () => {
    if (isLoading) return

    setIsLoading(true)
    console.log("Fetching blogs")

    try {
      const result = await getBlogs()
      setBlogs(result)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    fetchBlogs()
  }
  useEffect(() => {
    fetchBlogs()
  }, [])

  if (isLoading) {
    return <ActivityIndicator className="flex-1 justify-center" />
  }

  return (
    <SafeAreaView className="h-full bg-stone-200">
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={blogs || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => <BlogCard blog={item} key={index} />}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 20,
        }}
        ListHeaderComponent={<HomeHeader />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        onRefresh={onRefresh}
        refreshing={isLoading}
      />
    </SafeAreaView>
  )
}

export default Home
