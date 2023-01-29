import { signIn } from 'next-auth/react';
import Layout from 'src/components/layout';

export default function Login() {
  return (
    <Layout pageTitle="Team Prediction">
      <div className="flex justify-center">
        <button
          className="bg-ctp-blue hover:bg-ctp-mauve rounded py-2 px-4 font-bold text-white"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </Layout>
  );
}
