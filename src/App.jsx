import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import PrivateRoute from './utils/PrivateRoute'
import RolebasedRoute from './utils/RolebasedRoute'
import AdminSummary from './components/dashboard/AdminSummary'
import SettingMainScreen from './components/setting/SettingMainScreen'
import ReportMainScreen from './components/report/ReportMainScreen'
import AppealMainScreen from './components/appeal/AppealMainScreen'
import TaxyearScreen from './components/setting/TaxyearScreen'
import TaxtypeScreen from './components/setting/TaxtypeScreen'
import BusinessCategoryScreen from './components/setting/BusinessCategoryScreen'
import SubcityScreen from './components/setting/SubcityScreen'
import RespondentScreen from './components/setting/RespondentScreen'
import AddTaxyearScreen from './components/setting/AddTaxyearScreen'
import AddTaxType from './components/setting/AddTaxType'
import AddBusinessCategory from './components/setting/AddBusinessCategory'
import AddRespondentScreen from './components/setting/AddRespondentScreen'
import AddSubcity from './components/setting/AddSubcity'
import AppealerList from './components/appealer/AppealerList'
import AddAppealer from './components/appealer/AddAppealer'
import AddAppealScreen from './components/appeal/AddAppealScreen'
import EditAppeal from './components/appeal/EditAppeal'
import ViewAppeal from './components/appeal/ViewAppeal'
import SetAppointment from './components/appeal/SetAppointment'
import AppointmentList from './components/appeal/AppointmentList'
import EditAppointment from './components/appeal/EditAppointment'
import FileTransferPage from './pages/FileTransferPage'
import FileHandoverScreen from './components/filetransfer/FileHandoverScreen'
import FileReceiveScreen from './components/filetransfer/FileReceiveScreen'
import AddAppealDecision from './components/appeal/AddAppealDecision'
import UserList from './components/setting/UserList'
import AddUserScreen from './components/setting/AddUserScreen'
import OrderFollowup from './components/report/OrderFollowup'
import ClosedAppealsScree from './components/report/ClosedAppealsScree'
import PrintComponent from './utils/PrintComponent'
import FileHandoverPrint from './utils/FileHandoverPrint'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/admin-dashboard' />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoute>
            <RolebasedRoute requiredRole={["admin"]}>
              <AdminDashboard />
            </RolebasedRoute>
          </PrivateRoute>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path='/admin-dashboard/appealList' element={<AppealMainScreen />}></Route>
            <Route path='/admin-dashboard/createAppeal' element={<AddAppealScreen />}></Route>
            <Route path='/admin-dashboard/appeal/edit/:id' element={<EditAppeal />}></Route>
            <Route path='/admin-dashboard/appeal/approveAppeal/:id' element={<ViewAppeal />}></Route>
            <Route path='/admin-dashboard/appealerList' element={<AppealerList />}></Route>
            <Route path='/admin-dashboard/appointments/:id' element={<AppointmentList />}></Route>
            <Route path='/admin-dashboard/setAppointment/:id' element={<SetAppointment />}></Route>
            <Route path='/admin-dashboard/editAppointment' element={<EditAppointment />}></Route>
            <Route path='/admin-dashboard/saveAppealer' element={<AddAppealer />}></Route>
            <Route path='/admin-dashboard/saveAppealer/:id' element={<AddAppealer />}></Route>
            <Route path='/admin-dashboard/saveDecision/:id' element={<AddAppealDecision />}></Route>
            <Route path='/admin-dashboard/fileTransfer' element={<FileTransferPage />}>
              <Route index element={<FileHandoverScreen />}></Route>
              <Route path='/admin-dashboard/fileTransfer/handover' element={<FileHandoverScreen />}></Route>
              <Route path='/admin-dashboard/fileTransfer/recieve' element={<FileReceiveScreen />}></Route>
              <Route path='/admin-dashboard/fileTransfer/handoverToPrint/:id' element={<FileHandoverPrint />}></Route>
            </Route>
            <Route path='/admin-dashboard/report' element={<ReportMainScreen />}>
              <Route index element={<PrintComponent />}></Route>
              <Route path='/admin-dashboard/report/orderFollowUp' element={<PrintComponent />}></Route>
              <Route path='/admin-dashboard/report/closedAppeals' element={<ClosedAppealsScree />}></Route>
            </Route>
            <Route path='/admin-dashboard/settings' element={<SettingMainScreen />}>
              <Route index element={<TaxyearScreen />}></Route>
              <Route path='/admin-dashboard/settings/taxYearList' element={<TaxyearScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveTaxYear' element={<AddTaxyearScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveTaxYear/:id' element={<AddTaxyearScreen />}></Route>
              <Route path='/admin-dashboard/settings/taxTypeList' element={<TaxtypeScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveTaxType' element={<AddTaxType />}></Route>
              <Route path='/admin-dashboard/settings/saveTaxType/:id' element={<AddTaxType />}></Route>
              <Route path='/admin-dashboard/settings/categoryList' element={<BusinessCategoryScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveBusinessCategory' element={<AddBusinessCategory />}></Route>
              <Route path='/admin-dashboard/settings/saveBusinessCategory/:id' element={<AddBusinessCategory />}></Route>
              <Route path='/admin-dashboard/settings/subcityList' element={<SubcityScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveSubcity' element={<AddSubcity />}></Route>
              <Route path='/admin-dashboard/settings/saveSubcity/:id' element={<AddSubcity />}></Route>
              <Route path='/admin-dashboard/settings/respondentList' element={<RespondentScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveRespondent' element={<AddRespondentScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveRespondent/:id' element={<AddRespondentScreen />}></Route>

              <Route path='/admin-dashboard/settings/userList' element={<UserList />}></Route>
              <Route path='/admin-dashboard/settings/saveUser' element={<AddUserScreen />}></Route>
              <Route path='/admin-dashboard/settings/saveUser/:id' element={<AddUserScreen />}></Route>
            </Route>
          </Route>
        <Route path='/user-dashboard' element={<UserDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
