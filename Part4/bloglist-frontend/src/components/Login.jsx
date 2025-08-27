const Login = (props) => {
    return (
        <div>
            <form onSubmit={props.handleLogIn}>
                <div>
                    
                <label>
                    username
                    <input type="text" value={props.username} onChange={props.handleUsernameChange} />
                </label>
                </div>
                <div>

                <label>
                    password
                    <input type="text" value={props.password} onChange={props.handlePasswordChange} />
                </label>
                </div>
                <button type="Submit">Log in</button>
            </form>
        </div>
    )
}

export default Login