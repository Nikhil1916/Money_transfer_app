const Button = ({btnName,onClick}) => {
    return (
        <div onClick={onClick} className="bg-black text-white rounded-md p-1 text-center w-96 ">
            {btnName}
        </div>
    )
}

export default Button;