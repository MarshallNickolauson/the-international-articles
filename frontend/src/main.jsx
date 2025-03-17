import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import store from './store.js';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import MainLayout from './layouts/MainLayout';
import NotFoundScreen from './screens/NotFoundScreen';
import Dashboard from './screens/Dashboard.jsx';
import ArticleScreen from './screens/ArticleScreen.jsx';
import ArticleListScreen from './screens/ArticleListScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import AccountScreen from './screens/AccountScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import EditArticleScreen from './screens/EditArticleScreen.jsx';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route path='*' element={<NotFoundScreen />} />
                <Route index element={<Dashboard />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/article/:id' element={<ArticleScreen />} />
                <Route path='/articles' element={<ArticleListScreen />} />
                <Route path='' element={<PrivateRoute />}>
                    <Route path='/account' element={<AccountScreen />} />
                    <Route path='/article/:id/edit' element={<EditArticleScreen />} />
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
