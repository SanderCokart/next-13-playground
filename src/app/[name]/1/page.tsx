import GetOrderForm from "./(components)/GetOrderForm";

export default function Page1() {
    return (
        <div>
            <h1>Page1 Page</h1>
            <fieldset className="border-2 p-4">
                <legend className="px-4">
                    <h2>Form</h2>
                </legend>
                <GetOrderForm />
            </fieldset>
        </div>
    )
}