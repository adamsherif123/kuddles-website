import { addDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function addSubscriber(email: string): Promise<void> {
  // Normalize email (lowercase, trim)
  const normalizedEmail = email.trim().toLowerCase()

  // Check if email already exists
  const q = query(collection(db, "subscribers"), where("email", "==", normalizedEmail))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    // Email already exists, silently succeed (don't show error to user)
    return
  }

  // Add new subscriber
  await addDoc(collection(db, "subscribers"), {
    email: normalizedEmail,
    createdAt: serverTimestamp(),
  })
}
