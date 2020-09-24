import React, {useEffect} from 'react';
import SelectListItem from '../selectListItem';
import {connect} from 'react-redux';
import {setStaffMembers, setChosenStaffMembers} from '../../redux/actions/staffActions';
import Select from '../../components/select';
import axios from 'axios';



const StaffMemberSelect = (props) => {
    let {setStaffMembers, setChosenStaffMembers} = props;
    
    useEffect(() => {
        const getStaffMembers = async () => {
            const staffMembers = await axios.get('/staff');
            setStaffMembers(staffMembers.data);
        }
        getStaffMembers();        
    }, [setStaffMembers]);

    const handleChangeStaffSelect = (values, staffId, select) => {
        updateArrayChosenStaffMembers(values, staffId);
        
        //resets the select to the default option
        select.selectedIndex = 0;
    }

    const updateArrayChosenStaffMembers = async (values, staffId) => {
        let chosenStaffMembers = [];
        let staffMembersInitials = [];

        let staffMember = await axios.get(`/staff?id=${staffId}`);

        let staffDataObject = {
             name: staffMember.data.name,
             initials: staffMember.data.initials
         }

         for(const staffMember of props.chosenStaffMembers){
            chosenStaffMembers.push(staffMember);
            staffMembersInitials.push(staffMember.initials);
         }
         
         if(!chosenStaffMembers.includes(staffDataObject)){
             chosenStaffMembers.push(staffDataObject);
             staffMembersInitials.push(staffDataObject.initials);
         }

         setChosenStaffMembers(chosenStaffMembers);
         values.staff = staffMembersInitials
    }

    const onDeleteChosenStaff = (values, staffObject) => {
        let chosenStaffMembers = [];
        let staffMembersInitials = [];
        for(const staffMember of props.chosenStaffMembers){
            if(staffMember.name !== staffObject.name){
                chosenStaffMembers.push(staffMember);
                staffMembersInitials.push(staffMember.initials);
            }
        }

        setChosenStaffMembers(chosenStaffMembers);
        values.staff = staffMembersInitials; 
    }

    const staffMembersSelectValues = props.staffMembers.map(item => {
        let selectObject = {};
        selectObject[item._id] = item.name;
        return selectObject;
    });

   return (
       <>
        <Select error={props.error} items={staffMembersSelectValues} placeholder={props.placeholder} name={props.name} onChange={(e) => handleChangeStaffSelect(props.formValues, e.target.value, e.target)} />
        <div className='d-flex fd-column'>
            {props.chosenStaffMembers.map((staff) => <SelectListItem onDelete={() => onDeleteChosenStaff(props.formValues, staff)} text={staff.name}/>)}
        </div>
       </>
   )
}

const mapStateToProps = (state) => {
    return {
        staffMembers: state.staffReducer.staffMembers,
        chosenStaffMembers: state.staffReducer.chosenStaffMembers
    }
}

const mapDispatchToProps = {setStaffMembers, setChosenStaffMembers}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffMemberSelect)