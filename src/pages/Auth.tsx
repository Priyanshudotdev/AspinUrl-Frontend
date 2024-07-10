import GoogleSignInButton from "../components/GoogleSignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Auth = () => {
  return (
    // <div className="w-full px-[5vw] md:px-[4vw] lg:px-[5vw] mt-12 gap-10 h-screen flex flex-col items-center font-space">

    <div className="w-full h-auto px-[24vw] md:px-[33vw] lg:px-[39vw] my-[12rem]">
      <Card className=" h-[12rem] flex items-center justify-center flex-col ">
        <CardHeader>
          <CardTitle className="mx-auto font-normal tracking-wide text-lg ">
            Login / SignIn
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-auto mt-4 flex-1 ">
          <GoogleSignInButton />
        </CardContent>
      </Card>
    </div>

    // </div>
  );
};

export default Auth;

{
  /*
    <h1 className="text-3xl md:text-4xl  text-center font-extrabold mb-8 ">
        {{searchParams.get("createNew")
          ? "Hold up! Let's login first ... "
          : "Login / Signup"} }
          "Login / Signup"
          </h1>
    */
}
