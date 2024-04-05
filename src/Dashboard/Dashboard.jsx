import { Link, Outlet } from "react-router-dom";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
    return (
        <>
            <div className={styles.sidebar} >
                <h1>React Router</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/`}>Dashboard</Link>
                        </li>
                        <li>
                            <Link to={`/list`}>List</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.detail}>
                <Outlet />
            </div>
        </>
    );
}