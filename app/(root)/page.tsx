import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = () => {
  return (
    <form
      className="px-10 pt-[100px]"
      action={async () => {
        "use server";

        await signOut({ redirectTo: ROUTES.SIGN_IN });
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
};

export default Home;
