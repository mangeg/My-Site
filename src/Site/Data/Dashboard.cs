namespace Site.Data
{
    using System.Collections.Generic;

    public class Dashboard
    {
        public Dashboard()
        {
            Widgets = new List<Widget>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Widget> Widgets { get; set; }
    }
}