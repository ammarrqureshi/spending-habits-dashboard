


function IncomeCard(props){

    return(
     <div className="flex flex-row gap-6 items-center justify-center bg-white rounded-lg w-full py-6">
          <div className={`${props.Income ? 'bg-indigo-600' : 'bg-sky-400'} p-3 rounded`}>
          {props.icon}
          </div>
          <div className="flex flex-col items-start gap-1">
                <label className="font-medium text-gray-400 text-xs">{props.heading}</label>
                <label className="font-bold text-gray-800 text-lg">${props.amount}</label>
          </div>
     </div>

    )}

export default IncomeCard;