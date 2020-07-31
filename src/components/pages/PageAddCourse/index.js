import React, { useState } from "react";
import AddCourse from "components/admin/AddCourse";
import AddModules from "components/admin/AddCourse/AddModules";

export default function PageAddCourse() {
    const [course, setCourse] = useState({});
    console.log("asd");
    return (
        <form action="http://localhost:3001/courses/add" method="post">
            <AddCourse setCourse={setCourse} course={course} />
            <AddModules setCourse={setCourse} course={course} />
            <button type="submit" className="btn btn-success">
                Добавить курс
            </button>
        </form>
    );
}