


function Button(props) {

    return(
        <button onClick={props.onClick}
        className={`${(props.primary)? 'text-white bg-indigo-600 hover:text-indigo-600 hover:bg-white border border-indigo-600' : ' text-gray-800 border border-gray-800 hover:bg-gray-800 hover:text-white bg-transparent'}
        text-xs font-bold py-3 px-1 w-full rounded-md
    `}>
        {props.label}
      </button>
    )}

export default Button;

