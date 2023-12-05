import Loginpage from "./Loginpage"
import { BrowserRouter, Route, Routes, useNavigate   } from 'react-router-dom';
import RequireAuth from "./requireAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Student from './Student'
import Company from './Company'
import Admin from './Admin'
import SingleStudent from "./Student_admin/student/SingleStudent";
import SingleCoordinator from "./Coordinator/coordinator/SingleCoordinator";
import CompanyVacancie from "./Studentnew/Vacancie/CompanyVacancie"


function App() {
  return(
    
    <BrowserRouter>
     
 
     <Routes>
            <Route path="/" element={<Loginpage/>} />
            <Route element = {<RequireAuth />}>
              <Route path="/student" element={<Student/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/company" element={<Company />} />
              <Route path="/single_student/:id" element={<SingleStudent/>} />
              <Route path="/single_coordinator/:id" element={<SingleCoordinator/>} />  
              <Route path ="student/company_vacancies/:id" element={<CompanyVacancie/>} />          
            </Route>
            
  
       </Routes>
       
    
    </BrowserRouter>
    
    
   
   

  )
  
}

export default App
