import PhonebookItem from "./PhonebookItem"

export default function PhonebookList(props) {

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            props.loadMore()
        }
    }

    return (
        <div onScroll={scrolling} className="col" style={{ overflowY: 'scroll', height: 200 }}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((user, index) => (
                        <PhonebookItem key={user.id}
                            no={index + 1}
                            user={user}
                            remove={() => props.remove(user.id)}
                            resend={() => props.resend(user)}
                            update={props.update}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}