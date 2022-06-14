import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
    const [noOfRecord, setNoOfRecord] = useState(0);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [msg, setMsg] = useState('Please Wait...');
    const [bg, setBg] = useState('bg-info');

    useEffect(() => {
        // setTimeout(() => {
        fetch('https://api.publicapis.org/entries')
            .then((x) => {
                return x.json()
            })
            .then((data) => {
                setNoOfRecord(data.count);
                setData(data.entries);
                setFlag(true);
            })
            .catch((err) => {
                setMsg('Something went wrong!');
            })
            .finally(() => {
                setTimeout(() => {
                    setBg('bg-danger');
                }, 2000);
            });
        // }, 2000)
    }, []);

    return (
        <div className="container-fluid my-3">
            {
                !flag && (
                    <h2 className="text-danger text-center p-5">{msg}</h2>
                )
            }

            {
                flag && (
                    <>
                        <h3 className="text-center">Api Result - {noOfRecord} Results</h3>
                        <hr />

                        <div className="container-fluid">
                            <div className="d-flex flex-row flex-wrap">
                                {
                                    data.map((d, i) => (
                                        <div className={"col rounded-pill p-5 mx-3 mb-4 " + bg} key={i} style={{ 'flexBasis': '30%' }}>
                                            <h4>{d.API} &mdash; {d.Category}</h4>
                                            <p>{d.Description}</p>
                                            <a href={d.Link} target="_blank" className="text-light font-weight-bold">Visit</a>
                                            <div>
                                                <Link to={"/blogs/" + d.Description}>More Details</Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Blog;