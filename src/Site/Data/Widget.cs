namespace Site.Data
{
    public class Widget
    {
        public int Id { get; set; }
        public int DashboardId { get; set; }
        public int ColX { get; set; }
        public int ColY { get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public string Title { get; set; }

        public Dashboard Dashboard { get; set; }
    }
}