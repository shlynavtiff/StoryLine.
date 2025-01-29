import { useEffect, useState } from 'react';
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { supabase, User, AuthSession } from "../app/utils/supabaseClient"
interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}



export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check the user's session on load
    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: AuthSession | null) => {
        setUser(session?.user || null);
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
}, []);



  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });

    if (error) {
        console.error('Error logging in with Google:', error.message);
    } else {
        console.log('Logged in successfully:', data);
    }
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
      console.error('Error logging out:', error.message);
  } else {
      console.log('Logged out successfully');
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
            </Button>
          </div>
          <DialogTitle className="text-center text-xl font-normal">Create an account to start crafting.</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 px-4 py-6">
          <Button  onClick={handleGoogleLogin} variant="outline" className="w-full rounded-full font-normal">
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full rounded-full font-normal">
            Sign up with email
          </Button>
          <Button variant="outline" className="w-full rounded-full font-normal">
            Sign up with Facebook
          </Button>

          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline hover:text-gray-700">
              Sign in
            </Link>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4 px-6">
            Click "Sign up" to agree to Citadel's{" "}
            <Link href="/terms" className="underline hover:text-gray-700">
              Terms and Service
            </Link>{" "}
            and acknowledge that Citadel's{" "}
            <Link href="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </Link>{" "}
            applies to you.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

