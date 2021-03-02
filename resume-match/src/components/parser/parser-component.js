import React from "react"
import "./parser-component.css"

import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Slider,
    Typography,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
        float: "left",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    sortingBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    parserBox: {
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(20),
        height: 600,
    },
    salarySlider: {
        width: 200,
        float: "left",
        marginTop: theme.spacing(3),
    },
}))

const marks = [
    {
        value: 0,
        label: "0k",
    },
    {
        value: 50,
        label: "50k",
    },
    {
        value: 100,
        label: "100k",
    },
]

function valuetext(value) {
    return `${value}k`
}

function Parser() {
    const classes = useStyles()

    const [grade, setGrade] = React.useState("")
    const [distance, setDistance] = React.useState("")
    const [salary, setSalary] = React.useState(0)

    const handleGradeChange = (event) => {
        setGrade(event.target.value)
    }

    const handleDistanceChange = (event) => {
        setDistance(event.target.value)
    }

    const handleSalaryChange = (event, newSalary) => {
        setSalary(newSalary)
    }

    return (
        <div className={classes.parserBox}>
            <div className="sortingBox">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={grade}
                        onChange={handleGradeChange}
                    >
                        <MenuItem value={60}>60%+</MenuItem>
                        <MenuItem value={70}>70%+</MenuItem>
                        <MenuItem value={80}>80%+</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                        Distance
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={distance}
                        onChange={handleDistanceChange}
                    >
                        <MenuItem value={5}>within 5 km</MenuItem>
                        <MenuItem value={10}>within 10 km</MenuItem>
                        <MenuItem value={15}>within 15 km</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.salarySlider}>
                    <Typography id="discrete-slider-always" gutterBottom>
                        Salary
                    </Typography>
                    <Slider
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-always"
                        step={10}
                        marks={marks}
                        valueLabelDisplay="on"
                        value={salary}
                        onChange={handleSalaryChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Parser
