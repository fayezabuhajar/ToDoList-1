using System;

namespace Core.Entities;

public class Tassk : BaseEntity
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Status { get; set; }
    public DateTime DueDate { get; set; }
}
