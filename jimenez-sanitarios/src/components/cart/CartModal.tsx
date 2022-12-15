import {
  Backdrop,
  Box,
  Button,
  Fade,
  List,
  ListItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface CartModalProps {
  open: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}

export default function TransitionsModal({
  open,
  handleClose,
}: CartModalProps) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <List>{<ListItem></ListItem>}</List>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
