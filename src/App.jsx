import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router , Route , Routes } from "react-router-dom"
import { Home } from "./components/Home"
import { Header } from "./components/Header"
import { Protectedroutes } from "./components/Protectedroutes"
import { BarLoader } from "react-spinners"
import { Joblist_recruiter } from "./components/Joblist_recruiter"
import { Notfound } from "./components/Notfound"
import { Savedjobs } from "./components/Savedjobs"


const Lazyjobs = lazy(() => import('./components/Jobs'))
const LazyOnboard = lazy(() => import('./components/Onboard'))
const LazypostJob = lazy(() => import('./components/Postjob'))
const LazyJobdetail = lazy(() => import('./components/Jobdetail'))
const Lazymyjob = lazy(() => import('./components/Myjobs'))
const Lazymyjobdetail = lazy(() => import('./components/Joblistrecruiterdetail'))

function App() {
  
  return (
    <>
       <Header />
      
        <Router >
            <Suspense fallback={<BarLoader  style={{width : '100%'}} color='#87CEEB'/>}>
                 <Routes>
                          <Route path="/" element={
                          <>
                          <Home />
                          </>
                        } />
                      
                       
                       <Route element={<Protectedroutes />}>
                       <Route path="/onboarding" element={<LazyOnboard />} />
                       <Route path="/jobs" element={<Lazyjobs />} />
                       <Route path="/postjob" element={<LazypostJob />} />
                       <Route path="/jobs/:id" element={<LazyJobdetail />} />
                       <Route path="/joblistrecriuter" element={<Joblist_recruiter />} />
                       <Route path="/savedjobs" element={<Savedjobs />} /> 
                       <Route path="/myjobs" element={<Lazymyjob />} />
                       <Route path="/joblistrecruiterdetail/:id" element={<Lazymyjobdetail />} />
                       </Route>
                        <Route path="*" element={ <Notfound />} />

                 </Routes>
                 </Suspense>
        </Router>
    </>
  )
}

export default App
