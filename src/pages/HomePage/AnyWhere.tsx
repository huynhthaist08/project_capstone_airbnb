import { anyWhereData } from "@/api/anyWhere.data";
import { Card, CardContent } from "@/core/ui/card";

const AnyWhere = () => {
    return (
        <>
            <section className="py-10">
                <h2 className="text-2xl font-bold mb-6">Ở bất cứ đâu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {anyWhereData.map((item) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden group cursor-pointer"
                        >
                            <div className="aspect-4/3 overflow-hidden bg-muted">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <CardContent className="p-3">
                                <h3 className="font-semibold">{item.title}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
};

export default AnyWhere;
