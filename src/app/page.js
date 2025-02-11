import Layout from "./layout";
import UserForm from "@/components/UserForm"; // We will create this next
import AnimatedUserForm from "@/components/AnimatedUserForm"

export default function Home() {
  return (
    <Layout>
      {/* <UserForm /> */}
      <AnimatedUserForm />
    </Layout>
  );
}
