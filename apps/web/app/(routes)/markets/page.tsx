import MarketsHeader from "@/components/routes/markets/base-markets/markets-header";
import MarketsStats from "@/components/routes/markets/base-markets/markets-stats";
import MarketsSearchSection from "@/components/routes/markets/base-markets/markets-search-section";

export default function MarketsPage() {
    return (
        <div className="bg-background px-28 py-14">
            <div className="mx-auto space-y-6">
                <MarketsHeader/>
                <MarketsStats/>
                <MarketsSearchSection />
            </div>
        </div>
    )
}