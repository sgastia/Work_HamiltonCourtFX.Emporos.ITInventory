namespace HamiltonCourtFX.Emporos.ITInventory.Server.Models
{
    [Serializable]
    public class ResponseMessage
    {
        public bool IsOk {  get; set; }
        public int MessageCode { get; set; }    
        public string? Message { get; set; }
    }
}
