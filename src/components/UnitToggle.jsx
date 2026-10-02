
const UnitToggle = ({unit, setUnit, loading}) => {
    return (
        <div className='unit-toggle'>
            <button
                className={unit === "C" ? "Active" : ""}
                onClick={() => setUnit("C")}
                disabled={loading}
            >
                °C
            </button>
            <button
                className={unit === "F" ? "Active" : ""}
                onClick={() => setUnit("F")}
                disabled={loading}
            >
                °F
            </button>
        </div>
    )
}

export default UnitToggle
