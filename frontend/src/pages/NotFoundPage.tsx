import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui";
import { PUBLIC_ROUTES } from "../constants/routes";

export const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <AlertCircle className="h-8 w-8 text-slate-400" />
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-8 flex items-center justify-center gap-x-3">
        <Link to={PUBLIC_ROUTES.HOME}>
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  </div>
);
