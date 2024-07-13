import Button from "./Button";
import visaCard from './../assets/visaCard.png'; 


function CardBalance(){

    return(
       <div className="bg-white rounded-md p-3 flex flex-col items-start gap-4 w-full">
            <h1 className="font-bold text-gray-800 text-xl">My Card</h1>
            <div className="flex flex-col items-start">
                <label className="font-medium text-gray-400 text-xs">Card Balance</label>
                <label className="font-bold text-gray-800 text-lg">$878.51</label>
            </div>
            <div className="w-full pb-3">
                <img src={visaCard} alt="visa-card" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
                <Button label='Manage Cards' primary/>
                <Button label='Transfer'/>
            </div>
       </div>
    )}


export default CardBalance;