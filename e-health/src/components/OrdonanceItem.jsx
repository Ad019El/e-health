export default function OrdonanceItem(props){

    return(
        <div>
        <div className="shadow  mt-4 sm:rounded-md">
        <div className="grid grid-cols-6 gap-2 ">
        <p className="self-center">
          {props.drug}
        </p>
        <p className="self-center">
          {props.posologie}
        </p>
        <p className="self-center">
          {props.par}
        </p>
        <p className="self-center">
          {props.voie}
        </p>
        <p className="self-center">
          {props.duree}
        </p>
        </div>
        </div>
        </div>
        
    );
}