using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Arms.Domain.Entities
{
    public class Assessment
    {
        public int Id { get; set; }
        public string Feedback { get; set; }
        [Required]
        [ForeignKey("Round")]
        public int RoundId { get; set; }
        [Required]
        [ForeignKey("Application")]
        public int ApplicationId { get; set; }
        [Required]
        [ForeignKey("InterviewPanel")]
        public int InterviewPanelId { get; set; }
        public string Result { get; set; }
        
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public string CreatedAt { get; set; }
        public string ModifiedAt { get; set; }
    }
}