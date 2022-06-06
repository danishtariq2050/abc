import Infodetails from "./Infodetails";

function About() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <Infodetails
                        title="Declarative"
                        p1="React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes."
                        p2="Declarative views make your code more predictable and easier to debug" />
                </div>
                <div className="col">
                    <Infodetails
                        title="Component-Based"
                        p1="Build encapsulated components that manage their own state, then compose them to make complex UIs."
                        p2="Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM" />
                </div>
                <div className="col">
                    <Infodetails
                        title="Learn Once, Write Anywhere"
                        p1="We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code."
                        p2="React can also render on the server using Node and power mobile apps using "
                        website="React Native" />
                </div>
            </div>
        </div >
    );
}

export default About;