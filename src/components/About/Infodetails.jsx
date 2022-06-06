// function Infodetails(props) {
//     return (
//         <>
//             <h4>{props.title}</h4>
//             <p>{props.p1}</p>
//             <p>{props.p2} <a href="https://reactnative.dev/" target="_blank">{props.website}</a>.</p>
//         </>
//     );
// }

function Infodetails({ title, p1, p2, website }) {
    return (
        <>
            <h4>{title}</h4>
            <p>{p1}</p>
            <p>{p2} <a href="https://reactnative.dev/" target="_blank">{website}</a>.</p>
        </>
    );
}

export default Infodetails;