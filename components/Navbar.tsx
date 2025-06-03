import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  // Нужно выводить контент только если юзер залогинен, чтобы это понять берем инфу из его сессии от Auth.js
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={144}
            height={30}
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <span className="font-bold text-2xl text-[#E60028] max-sm:hidden">
          Post App
        </span>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/article/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-7 pb-1 sm:hidden" />
              </Link>
              {/* Как и auth signOut и signIn ассинхронные, просто добавить async как с auth нельзя, поэтому добавляем такой код */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              {/* По идее такой подход работать не должен из за того что кнопка
              это типичный пример client side компонента, но с такой настройкой
              он у меня и как серверный работает, но правильнее все же будет
              использовать новый метод выше от команды некста, через форму, где
              в action можно засунуть server side */}
              {/* <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span>Logout</span>
              </button> */}
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>

            /* <button
              onClick={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <span>Login</span>
            </button> */
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
