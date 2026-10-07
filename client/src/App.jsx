import {Routes,Route} from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Services from './pages/Services.jsx';
import Studio from './pages/Studio.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import WebsiteInfo from './pages/admin/WebsiteInfo.jsx';
import Media from './pages/admin/Media.jsx';
import Inquiries from './pages/admin/Inquiries.jsx';
import Admins from './pages/admin/Admins.jsx';
import Account from './pages/admin/Account.jsx';
import Audit from './pages/admin/Audit.jsx';
import Products from './pages/admin/Products.jsx';
import Categories from './pages/admin/Categories.jsx';
import Subcategories from './pages/admin/Subcategories.jsx';
import TeamMembers from './pages/admin/TeamMembers.jsx';
import AdminServices from './pages/admin/Services.jsx';
import Testimonials from './pages/admin/Testimonials.jsx';
export default function App(){return <Routes><Route element={<PublicLayout/>}><Route index element={<Home/>}/><Route path="projects" element={<Projects/>}/><Route path="projects/:id" element={<ProjectDetail/>}/><Route path="services" element={<Services/>}/><Route path="studio" element={<Studio/>}/><Route path="contact" element={<Contact/>}/></Route><Route path="login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route path="admin" element={<AdminLayout/>}><Route index element={<Dashboard/>}/><Route path="products" element={<Products/>}/>
<Route path="categories" element={<Categories/>}/>
<Route path="subcategories" element={<Subcategories/>}/>
<Route path="team-members" element={<TeamMembers/>}/>
<Route path="services" element={<AdminServices/>}/>
<Route path="testimonials" element={<Testimonials/>}/><Route path="website-info" element={<WebsiteInfo/>}/><Route path="media" element={<Media/>}/><Route path="inquiries" element={<Inquiries/>}/><Route path="admins" element={<Admins/>}/><Route path="account" element={<Account/>}/><Route path="audit" element={<Audit/>}/></Route></Route><Route path="*" element={<NotFound/>}/></Routes>;}
