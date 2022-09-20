function Alert(props) {
  return (
    <>
      {props.type === "Failed!" ? (
        <div
          class={`bg-red-200 border-red-600 text-red-600 border-l-4 p-4`}
          role="alert"
        >
          <p class="font-bold">Oops!</p>
          <p>{props.content}</p>
        </div>
      ) : props.calendar ? (
        <>
          <div
            class={`bg-green-200 border-green-600 text-green-600 border-l-4 p-4`}
            role="alert"
          >
            <p class="font-bold">{props.type}</p>
            <p>{props.content}</p>
          </div>
        </>
      ) : (
        <div
          class={`bg-green-200 border-green-600 text-green-600 border-l-4 p-4`}
          role="alert"
        >
          <p class="font-bold">Succès</p>
          <p>{props.content}</p>
          <a href="/login" className="font-bold underline">
            Back to login
          </a>
        </div>
      )}
    </>
  );
}
export default Alert;
