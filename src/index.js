import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Box, createTheme, Grid} from "@material-ui/core";
import {Item} from "@mui-treasury/components/flex";
/*
class FormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.doSomethingWithInput = this.doSomethingWithInput.bind(this);
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextFieldChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value,
        });
    }

    doSomethingWithInput(event) {
        event.preventDefault();
        this.setState({
            value:event.target.value
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        this.setState({
            value:this.state.value
        })
        event.preventDefault();
    }
    render() {
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Task:
                        <input className="inputfields" type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" className="inputbutton" value="Submit"/>
                </form>
            </>
        );
    }
}

class Myform extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:''
        }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Task:
                    <input className="inputfields" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" className="inputbutton" value="Submit"/>
            </form>
            </div>

    )
    }
}


export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (value) => {
        setOpen(false);
    };
    return (
        <div>
            <Button startIcon={<AddCircleIcon/>} onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <FormClass/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


class Task extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            name:'TestName',
            description:'sometext',
            deadline:'2000-12-12',
            selectedvalue:'',
            open:false,
        }
    }

    AddTest(newname){
        this.setState({
            name:newname
        })
    }
    render(){
        return(
            <Card sx={{maxWidth:300}}>
                <CardContent>
                    <Typography>
                        Név:{this.props.value}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button startIcon={<ArrowUpwardIcon/>}/>
                    <Button startIcon={<ArrowDownwardIcon/>} />
                </CardActions>
            </Card>


        )
    }
}
class TaskContainer extends React.Component{
    constructor() {
        super();
        this.state={
            tasks:[],
            taskcnt:0,
        }
    }

    addTask(name,description,date){
        let tasks=this.state.tasks
        tasks.push() //TODO
        this.setstate({
            tasks:tasks,
        })
    }

    render() {
        return (
            <label>
                TESZT
            </label>
        );
    }
}



class Dataline extends React.Component{
    constructor(props) {
        super(props);
    }
    render(i){
        return(
            <button className="dataline">
                {this.props.value}
            </button>
        )
    }
}
*/
class ProjectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id:this.props.value,
            datalines:Array().fill(''),
            datas:Array().fill(''),
            ids:Array().fill(''),
            opens:Array().fill(false),
            test:'testname',
            value:'',
            value2:'',
            valuemodify:'aaaaa',
            value2modify:'bbbbb',
            count:0,
            open:false,
            modifydx:0,
            init:false,
            max:false,
            maxid:0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitmodify = this.handleSubmitmodify.bind(this);
    }

    handleClickOpenmodify(dx){
        let boolarray=this.state.opens
        boolarray[dx]=true
        let array1=this.state.datalines
        let array2=this.state.datas
        this.setState({opens:boolarray,
        valuemodify:array1[dx],
            value2modify:array2[dx],
            modifydx:dx
        })
    }
    handleClosemodify(dx){
        let boolarray=this.state.opens
        boolarray[dx]=false
        this.setState({opens:boolarray})
    }


    initlines(){
        if(this.state.init===false) {
            this.setState({init:true})
            const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.adddatalines(data))
                .catch(error => console.error('Unable to get items.', error));
        }
    }
    adddatalines(data){
        var k=0
        for(k=0;k<data.length;k++){
            if(data[k].columnID===this.state.id){
                let newarray=this.state.datalines
                let newarray2=this.state.datas
                let newarray3=this.state.ids
                let prevcount=this.state.count
                newarray[this.state.count]=data[k].name
                newarray2[this.state.count]=data[k].description
                newarray3[this.state.count]=data[k].id
                this.setState({
                    count:prevcount+1,
                    datalines:newarray,
                    datas:newarray2,
                    ids:newarray3
                })
            }
        }
    }

    getmaxid(){
      /*  if(this.state.max===false) {
            const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.maxid(data))
                .catch(error => console.error('Unable to get items.', error));
        }


       */
        setTimeout(() => {  const uri = '/api/todoitems';
            fetch(uri)
                .then(response => response.json())
                .then(data => this.maxid(data))
                .catch(error => console.error('Unable to get items.', error)); }, 5000);
    }
    maxid(data){
        var dx=0;
        for(var k=0;k<data.length;k++){
            dx=data[k].id
        }
        this.setState({
            maxid:dx,
            max:true
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let newarray=this.state.datalines
        let newarray2=this.state.datas
        let newarray3=this.state.ids
        let prevcount=this.state.count
        newarray[this.state.count]=this.state.value
        newarray2[this.state.count]=this.state.value2
        newarray3[this.state.count]=this.state.maxid+1
        const item={
            id:this.state.maxid+1,
            columnID:this.state.id,
            name:this.state.value,
            description:this.state.value2,
            position:1,
            column:null
        }
        fetch('api/todoitems', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
            })
            .then(response => response.json())
            .catch(error => console.error('Unable to add item.', error))
        this.setState({
            count:prevcount+1,
            datalines:newarray,
            datas:newarray2,
            ids:newarray3,
            value:'',
            value2:'',
            open:false,
            max:false
        })



    }


    handleSubmitmodify(event) {
        //this.setState({output: this.state.value })
        event.preventDefault();
        let newarray=this.state.datalines
        let newarray2=this.state.datas
        let dx=this.state.modifydx
        newarray[dx]=this.state.valuemodify
        newarray2[dx]=this.state.value2modify
        let id=this.state.ids[dx]

        const item={

        }
        fetch('/api/todoitems/'+[id], {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                    id:id,
                    columnID:this.state.id,
                    name:this.state.valuemodify,
                    description:this.state.value2modify,
                    position:1,
                    column:null
            })
        }).catch(error => console.error('Unable to add item.', error))
        /*    .then(()=>this.setState({
            datalines:newarray,
            datas:newarray2,
            valuemodify:'',
        }))*/


        this.handleClosemodify(dx)
    }

    emptydataline(i){
        let datalinesnew=this.state.datalines
        let id=this.state.ids[i]
        this.setState({
            datalines:datalinesnew,
        })
        fetch("/api/todoitems/"+id, {
            method: 'DELETE'
        })
            .catch(error => console.error('Unable to delete item.', error));

        this.reorderdatalines(i)
        this.renderdatalines()
    }
    reorderdatalines(i){
        let datalinesnew=this.state.datalines
        let datasnew=this.state.datas
        let idsnew=this.state.ids
        let datacnt=this.state.count
        if(i>=datacnt)
            return
        for(let j=i;j<datacnt;j++) {
            datalinesnew[j] = datalinesnew[j + 1]
            datasnew[j] = datasnew[j + 1]
            idsnew[j] = idsnew[j + 1]
        }
        this.setState({
            datalines: datalinesnew,
            datas:datasnew,
            ids:idsnew,
            count:datacnt-1
        })
    }
    updataline(i){
        let datalinesnew=this.state.datalines
        let datasnew=this.state.datas
        let idsnew=this.state.ids
        let buffer=datalinesnew[i-1]
        let buffer2=datasnew[i-1]
        let buffer3=idsnew[i-1]
        if(i===0)
            return
        datalinesnew[i-1]=datalinesnew[i]
        datalinesnew[i]=buffer
        datasnew[i-1]=datasnew[i]
        datasnew[i]=buffer2


        const item={
            id:idsnew[i-1],
            columnID:this.state.id,
            name:datalinesnew[i-1],
            description:datasnew[i-1],
            position:1,
            column:null
        }

        const item2={
            id:idsnew[i],
            columnID:this.state.id,
            name:datalinesnew[i],
            description:datasnew[i],
            position:1,
            column:null
        }
        this.fetchback(idsnew[i],item2,idsnew[i-1],item)
        this.setState({
            datalines:datalinesnew,
            datas:datasnew,
            ids:idsnew
        })
    }
    downdataline(i){
        let datalinesnew=this.state.datalines
        let datasnew=this.state.datas
        let idsnew=this.state.ids
        let buffer=datalinesnew[i+1]
        let buffer2=datasnew[i+1]
        if(i===6 || this.state.count<=i+1 || datalinesnew[i-1]===null)
            return
        datalinesnew[i+1]=datalinesnew[i]
        datalinesnew[i]=buffer
        datasnew[i+1]=datasnew[i]
        datasnew[i]=buffer2
        const item={
            id:idsnew[i+1],
            columnID:this.state.id,
            name:datalinesnew[i+1],
            description:datasnew[i+1],
            position:1,
            column:null
        }

        const item2={
            id:idsnew[i],
            columnID:this.state.id,
            name:datalinesnew[i],
            description:datasnew[i],
            position:1,
            column:null
        }
        this.fetchback(idsnew[i],item2,idsnew[i+1],item)
        this.setState({
            datalines:datalinesnew,
            datas:datasnew,
            ids:idsnew
        })
    }

    fetchback(i,item,i2,item2){
        fetch("/api/todoitems/"+i, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).catch(error => console.error('Unable to add item.', error))
        fetch("/api/todoitems/"+i2, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item2)
        }).catch(error => console.error('Unable to add item.', error))
    }


    renderdatalines(){
        let datalinesrender=[]
        for(let i=0; i<this.state.count; i++){
            let open=this.state.opens[i]
            datalinesrender.push(
                <div className="margin">
                    <Card sx={{maxWidth:300}}>
                        <CardContent>
                            <Typography>
                                Név:{this.state.datalines[i]}
                            </Typography>
                            <Typography>
                                Leírás:{this.state.datas[i]}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={<ArrowUpwardIcon/>} onClick={()=>this.updataline(i)}/>
                            <Button startIcon={<ArrowDownwardIcon/>} onClick={()=>this.downdataline(i)} />
                            <Button startIcon={<DeleteIcon/>} onClick={() => this.emptydataline(i)}/>
                            <Button sx={{width:300}} startIcon={<AddCircleIcon/>} onClick={()=>this.handleClickOpenmodify(i)}/>
                            <Dialog open={open} alignItems="center">
                                <DialogTitle>Modify a Task</DialogTitle>
                                <DialogContentText >To modify a Task please edit the fields below</DialogContentText>
                                <DialogContent>
                                    <form onSubmit={this.handleSubmitmodify}>
                                        <label>
                                            Task:
                                            <TextField type="text" value={this.state.valuemodify} onChange={(e)=>this.setState({valuemodify: e.target.value})} />
                                            Description:
                                            <TextField type="text" value={this.state.value2modify} onChange={(e)=>this.setState({value2modify: e.target.value})} />
                                        </label>
                                        <div> <Button onClick={()=>this.handleClosemodify(i)}>Cancel</Button>
                                            <Button type="submit" variant="text" value="Submit">Modify</Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardActions>
                    </Card>
                </div>
            )
        }
        return datalinesrender
    }
    render() {

        return (
            <Box>
                {this.initlines()}
                {this.getmaxid()}
                <Button sx={{width:300}} startIcon={<AddCircleIcon/>} onClick={()=>this.setState({open:true})}/>
                <Dialog open={this.state.open} alignItems="center">
                    <DialogTitle>Add a Task</DialogTitle>
                    <DialogContentText >To add a new Task please fill the fields below</DialogContentText>
                    <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Task:
                            <TextField required type="text" value={this.state.value} onChange={(e)=>this.setState({value: e.target.value})} />
                            Description:
                            <TextField type="text" value={this.state.value2} onChange={(e)=>this.setState({value2: e.target.value})} />
                        </label>
                        <div> <Button onClick={()=>this.setState({open:false})}>Cancel</Button><Button type="submit" variant="text" value="Submit">Add</Button></div>
                    </form>
                    </DialogContent>
                </Dialog>
                {this.renderdatalines()}
            </Box>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            numberOfprojects:0,
            projectArray:Array(3).fill(''),
            maxprojectsnumber:10,
            init:false,
            maxid:0
        }
    }

    fetchcolumn(i){
        const item={
            ID:i,
            TodoItems:null,
        }
        fetch('api/columns', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .catch(error => console.error('Unable to add item.', error))
    }

    addProject(dx){
        let projects= []
        for(let j=0;j<this.state.numberOfprojects;j++){
            projects.push(this.state.projectArray[j])
        }
        projects.push(
            <Grid item xs={12} md={3}>
                    <ProjectBox value={(dx+1)} />
            </Grid>

            )
        this.fetchcolumn(dx+1)
        this.setState({
            projectArray:projects,
            numberOfprojects:this.state.numberOfprojects+1
        })
    }
    addProjectwithoutfetch(dx){
        let projects= []
        for(let j=0;j<this.state.numberOfprojects;j++){
            projects.push(this.state.projectArray[j])
        }
        projects.push(
            <Grid item xs={12} md={3}>
                <ProjectBox value={(dx+1)} />
            </Grid>

        )
        this.setState({
            projectArray:projects,
            numberOfprojects:this.state.numberOfprojects+1
        })
    }
    clearProjects(){
        this.deletealltodos()
        this.setState({
            projectArray:Array(0),
        })
    }

    addlist(data){
            for (var k = 0; k < data.length; k++) {
                this.addProjectwithoutfetch(k);
            }
    }
    initcolumns(){
        if(this.state.init===false) {
            this.setState({init:true})
            const uri = '/api/columns';
                fetch(uri)
                    .then(response => response.json())
                    .then(data => this.addlist(data))
                    .catch(error => console.error('Unable to get items.', error));
        }
    }

    maxid(data){
        let dx=0;
        for(let k=0;k<data.length;k++){
            dx=data[k].id
        }
        this.setState({
            maxid:dx,
        })
        for(let l=1;l<=dx;l++){
            this.deletetodo(l)
        }
        for(let h=1;h<=this.state.numberOfprojects;h++){
            this.deletecolumns(h)
        }
        this.setState({numberOfprojects:0})
    }

    deletecolumns(h){
        fetch("/api/columns/"+h, {
            method: 'DELETE'
        })
            .catch(error => console.error('Unable to delete item.', error));
    }
    deletetodo(id){
        fetch("/api/todoitems/"+id, {
            method: 'DELETE'
        })
            .catch(error => console.error('Unable to delete item.', error));
    }
    deletealltodos(){
        const uri = '/api/todoitems';
        fetch(uri)
            .then(response => response.json())
            .then(data => this.maxid(data))
            .catch(error => console.error('Unable to get items.', error));
    }


    render() {
        return (
            <div >
                <Box >
                    <Grid container spacing={2}>
                        {this.initcolumns()}
                        {this.state.projectArray}
                        <Grid item xs={12} md={3}>
                            <Button variant="text" onClick={()=>this.addProject(this.state.numberOfprojects)}> Add Project</Button>
                            <Button variant="text" onClick={()=>this.clearProjects()}> Clear Projects</Button>
                        </Grid>
                    </Grid>
                </Box>


            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
