import afterEffectsLogo from './../assets/afterEffects.png';

function TransactionRow(props){

    return(
        <tr>
            <td className="py-4 pr-4 text-gray-950 text-xs font-medium text-left text-wrap
            cursor-pointer flex flex-row items-center gap-2 w-[10rem]">
               {/* <img src={afterEffectsLogo} alt="list-logo" className='w-[1.2rem] h-auto object-cover' />  */}
                {props.name}
            </td>
            <td className="py-4 px-4 text-gray-950 text-xs font-medium text-left text-nowrap w-[20%]
            cursor-pointer">
              {props.date}
            </td>
            <td className="py-4 px-4 text-gray-950 text-xs font-medium text-left text-nowrap w-[20%]
            cursor-pointer">
                ${props.amount}
            </td>
            <td className="py-4 px-4 text-green-500 text-xs font-medium text-left text-nowrap w-[20%]
            cursor-pointer ">
                {props.status}
            </td>
        </tr>
    )}



export default TransactionRow;