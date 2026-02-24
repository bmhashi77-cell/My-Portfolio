import ServicesSection from '../components/ServicesSection'

const Services = () => {
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 pt-12">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="text-muted-foreground">
          From design to deployment, I help founders and teams ship performant web experiences.
        </p>
      </div>
      <ServicesSection />
    </div>
  )
}

export default Services
