"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getCamperById } from "@/lib/api";
import type { Camper } from "@/types/camper";

type Tab = "features" | "reviews";

export default function CamperDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("features");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCamperById(String(id));
        setCamper(data);
      } catch {
        setError("Failed to load camper");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBookingSuccess(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!camper) return <p>Camper not found.</p>;

  return (
    <main>
      <header>
        <h1>{camper.name}</h1>
        <div>
          <span>
            ★ {camper.rating} ({camper.reviews?.length || 0} reviews)
          </span>
          <span>{camper.location}</span>
        </div>
        <p>€{camper.price.toFixed(2)}</p>
      </header>

      {camper.gallery && camper.gallery.length > 0 && (
        <div>
          {camper.gallery.slice(0, 3).map((img) => (
            <div key={img.original}>
              <Image
                src={img.original}
                alt={camper.name}
                width={500}
                height={300}
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <section>
          <div>
            <button
              type="button"
              onClick={() => setActiveTab("features")}
              className={`pb-2 cursor-pointer ${
                activeTab === "features"
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 cursor-pointer ${
                activeTab === "reviews"
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
            >
              Reviews
            </button>
          </div>

          {activeTab === "features" && (
            <div>
              <p>{camper.description}</p>

              <div>
                {camper.AC && <span>AC</span>}
                {camper.bathroom && <span>Bathroom</span>}
                {camper.kitchen && <span>Kitchen</span>}
                {camper.TV && <span>TV</span>}
                {camper.radio && <span>Radio</span>}
                {camper.refrigerator && <span>Refrigerator</span>}
                {camper.microwave && <span>Microwave</span>}
                {camper.gas && <span>Gas</span>}
                {camper.water && <span>Water</span>}
                {camper.transmission && <span>{camper.transmission}</span>}
                {camper.engine && <span>{camper.engine}</span>}
              </div>

              <h3>Details</h3>
              <dl>
                {camper.form && (
                  <>
                    <dt>Form</dt>
                    <dd>{camper.form}</dd>
                  </>
                )}
                {camper.length && (
                  <>
                    <dt>Length</dt>
                    <dd>{camper.length}</dd>
                  </>
                )}
                {camper.width && (
                  <>
                    <dt>Width</dt>
                    <dd>{camper.width}</dd>
                  </>
                )}
                {camper.height && (
                  <>
                    <dt>Height</dt>
                    <dd>{camper.height}</dd>
                  </>
                )}
                {camper.tank && (
                  <>
                    <dt>Tank</dt>
                    <dd>{camper.tank}</dd>
                  </>
                )}
                {camper.consumption && (
                  <>
                    <dt>Consumption</dt>
                    <dd>{camper.consumption}</dd>
                  </>
                )}
              </dl>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((review) => (
                  <div key={review.reviewer_name + review.comment}>
                    <div>
                      <span className="font-semibold">
                        {review.reviewer_name}
                      </span>
                      <span>★ {review.reviewer_rating}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </section>

        {/* Booking form */}
        <aside>
          <h2>Book now</h2>
          <p>Send a request and we will contact you to confirm your booking.</p>

          <form onSubmit={handleBookingSubmit}>
            <input name="name" required placeholder="Name" />
            <input name="email" type="email" required placeholder="Email" />
            <input name="date" type="date" required />
            <textarea name="comment" placeholder="Comment" />

            <button type="submit">Send</button>

            {bookingSuccess && <p>Booking request sent successfully!</p>}
          </form>
        </aside>
      </div>
    </main>
  );
}
