import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analyzer" },
    { name: "description", content: "Smart feedback!" },
  ];
}

export default function Home() {
    const {auth}=usePuterStore();
    const location = useLocation();
    const next=location.search.split('next=')[1];
    const navigate=useNavigate();

    useEffect(()=>{
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated,next])

  return <main className="bg-[url(`/images/bg-main.svg`)] bg-cover">
      <Navbar />
      <section className="main-section">
          <div className="page-heading py-16">
              <h1>Track your Information</h1>
              <h2>Review your submission & check ai powered feedback.</h2>
          </div>
          {resumes.length > 0 && (
              <div className="resumes-section">
                  {resumes.map( (resume)=>(
                      <ResumeCard key={resume.id} resume={resume}/>
                  ))}

              </div>
          )}
      </section>


  </main>
}
