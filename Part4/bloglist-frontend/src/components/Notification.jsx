const Notification = ({ message, error }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    textColor: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  let style

  if(error) style = errorStyle
  else style = notificationStyle

  if(message === null) return null


  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification