import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
    const [todo, setTodo] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [formValid, setFormValid] = useState(false);

    // const getTodo = () => {
    //   Axios.get("http://localhost:3001/todo").then((res) => {
    //     setTodo(res.data);
    //   });
    // };

    useEffect(() => {
        Axios.get("https://colorful-clam-loafers.cyclic.app/todo").then((res) => {
            setTodo(res.data.reverse());
        });
    }, []);

    useEffect(() => {
        const check = title.trim().length > 0 && price != 0;
        if (check) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [title, price])

    const addTodo = () => {
        Axios.post("https://colorful-clam-loafers.cyclic.app/add", { title: title, price: price }).then(() => {
            setTodo([...todo, { title: title, price: price }]);
        });
    };

    const deleteTodo = (id) => {
        Axios.delete(`https://colorful-clam-loafers.cyclic.app/delete/${id}`).then((res) => {
            setTodo(
                todo.filter((val) => {
                    return val.id != id
                })
            )
        })
    }

    return (
        <>
            <div className="container">
                <div
                    className="bg-second container"
                    style={{
                        borderRadius: "14px",
                        backgroundColor: "#fefefe",
                        minHeight: "500px"
                    }}
                >
                    <h1 className="text-center m-5">Todo App</h1>
                    <div className="information">
                        <form action="" className="mx-5">
                            <label htmlFor="title" className="form-label mb-2">
                                ชื่อลายการ:
                            </label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="อะไรก็ได้..."
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }}
                            />
                            <label htmlFor="title" className="form-label mb-2">
                                จำนวนเงิน:
                            </label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="100,000..."
                                onChange={(event) => {
                                    setPrice(event.target.value)
                                }}
                            />
                            <button className="btn btn-success container-fluid" disabled={!formValid} onClick={addTodo}>เพิ่ม</button>
                        </form>
                    </div>
                    <br />
                    <div className="showTodo">
                        {todo.map((val, key) => {
                            return (
                                <div className="todo card mb-3 mx-5" key={key}>
                                    <div className="card-body text-left animate__animated animate__fadeInUp">
                                        <p className="card-text h6">รายการ: {val.title}</p>
                                        <p className="card-text h6">จำนวนเงิน: {val.price.toLocaleString('en-US')} ₭</p>
                                        <p className="card-text">{val.date.slice(0, 10)}</p>
                                        <button className="btn btn-danger" onClick={() => {
                                            deleteTodo(val.id)
                                        }}>ลบ</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <br />
                </div>
            </div>
        </>
    );
}

export default App;
