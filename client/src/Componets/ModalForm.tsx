import { Close } from "@mui/icons-material"
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"

interface IModalProps{
    title?:string
    children:JSX.Element
    open:boolean
    setOpen:React.Dispatch<React.SetStateAction<any>>
}
  
  const ModalForm = ({ title, children, open, setOpen }:IModalProps) => {

    return (
      <Dialog open={open}>
        <DialogTitle>
          <Typography>{title}</Typography>
          <Typography align="right">
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={setOpen}
            >
              <Close />
            </Button>
          </Typography>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    )
  }
  
  export default ModalForm