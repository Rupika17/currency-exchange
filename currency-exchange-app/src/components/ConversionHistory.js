import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversionResult, setConversionHistory } from "../actions/actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { saveConversionHistory } from '../localStorage';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConversionHistory = () => {
  const [open, setOpen] = React.useState(false);
  const [viewResult, setViewResult] = React.useState(null);
  const dispatch = useDispatch();
 
  const conversionHistory = useSelector((state) => state.conversionHistory);


  useEffect(() => {
    saveConversionHistory(conversionHistory);
  }, [conversionHistory]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewConversion = (conversion) => {
    setOpen(true);
    dispatch(setConversionResult(conversion));
    setViewResult(conversion)
  };

  const handleDeleteConversion = (index) => {
    const updatedHistory = conversionHistory.filter((_, i) => i !== index);
    dispatch(setConversionHistory(updatedHistory));
  };
  
  return (
    <>
      <h2 align="left">Conversion History</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversionHistory.map((conversion, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{conversion.date}</TableCell>
                <TableCell scope="row">
                  Converted an amount of{" "}
                  {conversion.amount + " " + conversion.toCurrency + " "} to{" "}
                  {conversion.fromCurrency}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<RemoveRedEyeIcon />}
                    onClick={() => handleViewConversion(conversion)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteForeverIcon />}
                    color="error"
                    onClick={() => handleDeleteConversion(index)}
                  >
                    Delete from history
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"View Conversion Result"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <List>
          <ListItem button>
            <ListItemText primary="Amount" secondary={viewResult?.amount} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="From"
              secondary={viewResult?.fromCurrency}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="To"
              secondary={viewResult?.toCurrency}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Result"
              secondary={viewResult?.result}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Date"
              secondary={viewResult?.date}
            />
          </ListItem>
        </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConversionHistory;
