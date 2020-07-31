import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/pages/Home";
import Course from "./components/pages/Course";
import CourseInfo from "components/pages/Course_info";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import SignOut from "./components/auth/SignOut";
import Users from "./components/admin/Users";
// import Films from "./components/pages/courses/Films";
import AdminHeader from "./components/admin/AdminHeader";
import AddCourse from "./components/pages/AddCourse";

import { Context } from "./context";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";

export default function App() {
    let courseProps = {
        videoURL: "https://www.youtube.com/watch?v=zLcf3sslAZ8",
        shortDesc:
            "Основы верстки с нуля. HTML, CSS, Flexbox. Верстка проекта.",
        longDesc: `1. В первой части мы узнаем кто такой frontend разработчик, познакомимся инструментами и изучим синтаксис HTML
        2. Во второй части мы перейдем к знакомству с CSS, узнаем о приоритетах стилей, посмотрим на панель разработчика, узнаем базовые свойства, поработаем с позиционированием и изучим Flexbox.
        3. В третьей части мы сверстаем небольшую страницу где применим все то что прошли ран
        4. Верстка проекта по макету.
        5. В четвертой части курса мы познакомимся с основами CSS Grid.`,
    };

    let longDescArr = courseProps.longDesc.split("\n");

    const [user, setUser] = useState({});

    useEffect(() => {
        const raw = localStorage.getItem("user") || JSON.stringify({});
        setUser(JSON.parse(raw));
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const onUserLogin = (user) => {
        setUser(user);
    };

    // Получение списка курсов

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/courses/all", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
            },
        }).then(async (e) => {
            setCourses(await e.json());
        });
    }, []);

    return (
        <Context.Provider value={{ onUserLogin, setUser, user }}>
            <div className="App">
                <Header />
                <AdminHeader />
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact>
                            <Home courses={courses} />
                        </Route>

                        <Route path={"/course_info"} exact>
                            <CourseInfo
                                videoURL={courseProps.videoURL}
                                shortDesc={courseProps.shortDesc}
                                longDescArr={longDescArr}
                            />
                        </Route>
                        <Route
                            path={"/course_info/:id"}
                            component={CourseInfo}
                        />

                        <Route path={"/course"}>
                            <Course
                                videoURL={courseProps.videoURL}
                                shortDesc={courseProps.shortDesc}
                                longDescArr={longDescArr}
                            />
                        </Route>
                        <Route path={"/auth/login"} component={SignIn} />
                        <Route path={"/auth/register"} component={SignUp} />
                        <Route path={"/auth/logout"} component={SignOut} />
                        <Route
                            path={"/admin/addCourse"}
                            component={AddCourse}
                        />
                        <Route path={"/admin/users"} component={Users} />
                        {/* <Route path={'/about'} component={About} /> */}
                        {/* <Route path={'/lectures'} component={Lectures} /> */}
                        {/* <Route path={'/library'} component={Libriary} /> */}
                        {/* <Route path={"/films"} component={Films} /> */}
                    </Switch>
                </BrowserRouter>
                <Footer />
            </div>
        </Context.Provider>
    );
}
