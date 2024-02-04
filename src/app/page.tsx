import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section
          className="w-full bg-cover bg-center py-12 md:py-24 lg:py-32 xl:py-48"
          style={{
            backgroundImage: "url('/placeholder.svg')",
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Recipe App
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Discover and share your favorite recipes with the world.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Recipes
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <img
                  alt="Recipe Image"
                  className="aspect-content mx-auto overflow-hidden rounded-t-xl object-cover object-center sm:w-full"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="flex flex-col items-center justify-center space-y-2">
                  <h3 className="text-lg font-bold">Recipe Name</h3>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Recipe Image"
                  className="aspect-content mx-auto overflow-hidden rounded-t-xl object-cover object-center sm:w-full"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="flex flex-col items-center justify-center space-y-2">
                  <h3 className="text-lg font-bold">Recipe Name</h3>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Recipe Image"
                  className="aspect-content mx-auto overflow-hidden rounded-t-xl object-cover object-center sm:w-full"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <CardContent className="flex flex-col items-center justify-center space-y-2">
                  <h3 className="text-lg font-bold">Recipe Name</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            <TwitterIcon className="h-4 w-4" />
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            <FacebookIcon className="h-4 w-4" />
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            <InstagramIcon className="h-4 w-4" />
          </Link>
        </nav>
        <p className="text-xs text-gray-500 dark:text-gray-400 sm:ml-auto">
          © 2024 Recipe App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PocketKnifeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
      <path d="M18 6h.01" />
      <path d="M6 18h.01" />
      <path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" />
      <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
