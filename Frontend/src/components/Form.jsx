export const Form = (props) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.name} onChange={props.onNameChanged} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.onNumberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form
