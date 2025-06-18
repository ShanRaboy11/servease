import { redirect } from "next/navigation";

export default function Home() {
  // This correctly points to the /register route.
  redirect("/login");
}